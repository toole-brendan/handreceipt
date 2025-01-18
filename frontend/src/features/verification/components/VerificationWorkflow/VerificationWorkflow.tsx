// src/ui/components/verification/VerificationWorkflow.tsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { FiPlus, FiX } from 'react-icons/fi';
import '../../../ui/styles/verification-workflow.css';

interface WorkflowTask {
  id: string;
  assetId: string;
  assetName: string;
  type: 'routine' | 'special' | 'incident';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignedTo: {
    id: string;
    name: string;
    rank: string;
  };
  dueDate: string;
  steps: WorkflowStep[];
  currentStep: number;
}

interface WorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  requiredRole: string;
  completedBy?: {
    id: string;
    name: string;
    rank: string;
  };
  completedAt?: string;
  notes?: string;
}

interface WorkflowFilters {
  status?: WorkflowTask['status'];
  priority?: WorkflowTask['priority'];
  type?: WorkflowTask['type'];
  assignedTo?: string;
}

export const VerificationWorkflow: React.FC = () => {
  const [tasks, setTasks] = useState<WorkflowTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<WorkflowTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<WorkflowFilters>({});
  const { classificationLevel } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchWorkflowTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, classificationLevel]);

  const fetchWorkflowTasks = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(
        `/api/verifications/workflow?${queryParams}`,
        {
          headers: {
            'Classification-Level': classificationLevel,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch workflow tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleStepComplete = async (
    taskId: string,
    stepId: string,
    notes: string
  ) => {
    try {
      const response = await fetch(
        `/api/verifications/workflow/${taskId}/steps/${stepId}/complete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Classification-Level': classificationLevel,
          },
          body: JSON.stringify({ notes }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to complete workflow step');
      }

      await fetchWorkflowTasks();
      setSelectedTask(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to complete step'
      );
    }
  };

  const handleTaskAssignment = async (taskId: string, userId: string) => {
    try {
      const response = await fetch(
        `/api/verifications/workflow/${taskId}/assign`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Classification-Level': classificationLevel,
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to assign task');
      }

      await fetchWorkflowTasks();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to assign task'
      );
    }
  };

  return (
    <div className="verification-workflow">
      <header className="workflow-header">
        <h2>Verification Workflow</h2>
        <div className="workflow-actions">
          <button className="btn-primary">
            <FiPlus /> Create New Task
          </button>
        </div>
      </header>

      <div className="workflow-filters">
        <div className="filter-group">
          <label>Status</label>
          <select
            value={filters.status || ''}
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value as WorkflowTask['status'],
              })
            }
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Priority</label>
          <select
            value={filters.priority || ''}
            onChange={(e) =>
              setFilters({
                ...filters,
                priority: e.target.value as WorkflowTask['priority'],
              })
            }
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading workflow tasks...</div>
      ) : (
        <div className="workflow-board" data-testid="workflow-board">
          <div className="workflow-columns">
            {['pending', 'in_progress', 'completed', 'overdue'].map((status) => (
              <div key={status} className={`workflow-column status-${status}`}>
                <h3>{status.replace('_', ' ').toUpperCase()}</h3>
                <div className="task-list">
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <div
                        key={task.id}
                        className={`task-card priority-${task.priority}`}
                        onClick={() => setSelectedTask(task)}
                      >
                        <div className="task-header">
                          <span className="task-type">{task.type}</span>
                          <span
                            className={`priority-badge priority-${task.priority}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <h4>{task.assetName}</h4>
                        <div className="task-meta">
                          <span>
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                          <span>
                            Step {task.currentStep} of {task.steps.length}
                          </span>
                        </div>
                        <div className="assigned-to">
                          {task.assignedTo.rank} {task.assignedTo.name}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header className="modal-header">
              <h3>Task Details</h3>
              <button
                className="btn-close"
                onClick={() => setSelectedTask(null)}
                aria-label="Close Modal"
              >
                <FiX />
              </button>
            </header>

            <div className="task-details">
              <section className="task-info">
                <h4>Asset Information</h4>
                <p>{selectedTask.assetName}</p>
                <div className="task-meta-grid">
                  <div>
                    <label>Type</label>
                    <span>{selectedTask.type}</span>
                  </div>
                  <div>
                    <label>Priority</label>
                    <span
                      className={`priority-badge priority-${selectedTask.priority}`}
                    >
                      {selectedTask.priority}
                    </span>
                  </div>
                  <div>
                    <label>Due Date</label>
                    <span>
                      {new Date(selectedTask.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </section>

              <section className="workflow-steps">
                <h4>Workflow Steps</h4>
                <div className="step-list">
                  {selectedTask.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`step-item status-${step.status}`}
                    >
                      <div className="step-header">
                        <span className="step-number">{index + 1}</span>
                        <span className="step-name">{step.name}</span>
                        <span
                          className={`step-status status-${step.status}`}
                        >
                          {step.status}
                        </span>
                      </div>
                      {step.completedBy && (
                        <div className="step-completion">
                          <span>
                            Completed by: {step.completedBy.rank}{' '}
                            {step.completedBy.name}
                          </span>
                          <span>
                            at: {new Date(step.completedAt!).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {step.status === 'pending' && (
                        <button
                          className="btn-primary"
                          onClick={() =>
                            handleStepComplete(selectedTask.id, step.id, '')
                          }
                        >
                          Complete Step
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
