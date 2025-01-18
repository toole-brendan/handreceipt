// frontend/src/pages/network/nodes.tsx

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '@/styles/components/pages/network/nodes.css';

interface NetworkNode {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'error';
  ipAddress: string;
  location: string;
  latency: number;
  connections: number[];
  load: number;
  bandwidth: {
    in: number;
    out: number;
  };
}

interface NetworkLink {
  source: number;
  target: number;
  strength: number;
}

const Nodes: React.FC = () => {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<NetworkNode, NetworkLink> | null>(null);

  useEffect(() => {
    fetchNodes();
    const interval = setInterval(fetchNodes, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (nodes.length > 0 && svgRef.current) {
      initializeNetworkVisualization();
    }
  }, [nodes]);

  const fetchNodes = async () => {
    try {
      const response = await fetch('/api/network/nodes');
      if (!response.ok) {
        throw new Error('Failed to fetch network nodes');
      }
      const data = await response.json();
      setNodes(data);
      setError(null);
    } catch (err) {
      setError('Error fetching network nodes. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const initializeNetworkVisualization = () => {
    if (!svgRef.current) return;

    // Clear existing visualization
    d3.select(svgRef.current).selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create links data from node connections
    const links: NetworkLink[] = nodes.flatMap(node =>
      node.connections.map(targetId => ({
        source: node.id,
        target: targetId,
        strength: 1
      }))
    );

    // Create force simulation
    const simulation = d3.forceSimulation<NetworkNode>(nodes)
      .force('link', d3.forceLink<NetworkNode, NetworkLink>(links)
        .id(d => d.id)
        .distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Create link elements
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'network-link')
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    // Create node elements
    const node = svg.append('g')
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(d3.drag<SVGGElement, NetworkNode>()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded));

    // Add circles for nodes
    node.append('circle')
      .attr('r', 20)
      .attr('class', d => `node-circle status-${d.status}`)
      .on('click', (event, d) => handleNodeClick(d));

    // Add labels
    node.append('text')
      .text(d => d.name)
      .attr('dx', 25)
      .attr('dy', 5)
      .attr('class', 'node-label');

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as NetworkNode).x!)
        .attr('y1', d => (d.source as NetworkNode).y!)
        .attr('x2', d => (d.target as NetworkNode).x!)
        .attr('y2', d => (d.target as NetworkNode).y!);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    simulationRef.current = simulation;

    function dragStarted(event: d3.D3DragEvent<SVGGElement, NetworkNode, unknown>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, NetworkNode, unknown>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event: d3.D3DragEvent<SVGGElement, NetworkNode, unknown>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  };

  const filteredNodes = nodes.filter((node) => {
    const matchesStatus = filterStatus === 'all' || node.status === filterStatus;
    const matchesSearch =
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.ipAddress.includes(searchQuery) ||
      node.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node);
  };

  if (loading) {
    return <div className="loading">Loading network nodes...</div>;
  }

  return (
    <div className="network-nodes">
      <div className="nodes-header">
        <h2>Network Nodes</h2>
        <div className="search-filter">
          <input
            type="text"
            className="form-input"
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-input"
          >
            <option value="all">All Statuses</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="network-visualization">
        <svg ref={svgRef} className="network-topology"></svg>
      </div>

      <div className="nodes-list">
        {filteredNodes.map((node) => (
          <div
            key={node.id}
            className={`node-card status-${node.status}`}
            onClick={() => handleNodeClick(node)}
          >
            <h4>{node.name}</h4>
            <p><strong>Status:</strong> {node.status}</p>
            <p><strong>IP:</strong> {node.ipAddress}</p>
            <p><strong>Latency:</strong> {node.latency}ms</p>
            <div className="node-metrics">
              <div className="metric">
                <span>Load</span>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${node.load}%` }}
                  ></div>
                </div>
              </div>
              <div className="metric">
                <span>Bandwidth</span>
                <div>↑ {node.bandwidth.out}Mbps ↓ {node.bandwidth.in}Mbps</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedNode && (
        <div className="modal-overlay" onClick={() => setSelectedNode(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Node Details - {selectedNode.name}</h3>
            <div className="node-details">
              <p><strong>Status:</strong> 
                <span className={`status-badge ${selectedNode.status}`}>
                  {selectedNode.status}
                </span>
              </p>
              <p><strong>IP Address:</strong> {selectedNode.ipAddress}</p>
              <p><strong>Location:</strong> {selectedNode.location}</p>
              <p><strong>Latency:</strong> {selectedNode.latency} ms</p>
              <p><strong>Load:</strong> {selectedNode.load}%</p>
              <p><strong>Bandwidth Usage:</strong></p>
              <ul>
                <li>Inbound: {selectedNode.bandwidth.in} Mbps</li>
                <li>Outbound: {selectedNode.bandwidth.out} Mbps</li>
              </ul>
              <p><strong>Connected Nodes:</strong> {selectedNode.connections.length}</p>
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary">Monitor</button>
              <button className="btn btn-warning">Restart</button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setSelectedNode(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nodes;