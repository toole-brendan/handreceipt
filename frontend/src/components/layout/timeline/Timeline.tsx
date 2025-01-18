import * as React from "react"
import "./timeline.css"

export interface TimelineProps {
  children: React.ReactNode;
}

export interface TimelineItemProps {
  children: React.ReactNode;
}

function TimelineItem({ children }: TimelineItemProps) {
  return (
    <div className="timeline-item">
      <div className="timeline-item__connector">
        <div className="timeline-item__dot" />
        <div className="timeline-item__line" />
      </div>
      <div className="timeline-item__content">
        {children}
      </div>
    </div>
  )
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="timeline">
      {children}
    </div>
  )
}

Timeline.Item = TimelineItem 