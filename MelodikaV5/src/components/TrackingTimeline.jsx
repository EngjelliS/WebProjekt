import React from 'react';
import PropTypes from 'prop-types';

const TrackingTimeline = ({ orderDate, getNextDay }) => {
  const trackingSteps = [
    {
      date: orderDate,
      title: 'Bestellung aufgegeben',
      status: 'completed'
    },
    {
      date: getNextDay(orderDate),
      title: 'Bestellung bearbeitet',
      status: 'completed'
    },
    {
      date: 'Heute',
      title: 'Versand vorbereitet',
      status: 'active'
    },
    {
      date: 'Ausstehend',
      title: 'Unterwegs',
      status: 'pending'
    },
    {
      date: 'Ausstehend',
      title: 'Zugestellt',
      status: 'pending'
    }
  ];

  return (
    <div className="tracking-info">
      <div className="tracking-timeline">
        {trackingSteps.map((step, index) => (
          <div key={index} className={`tracking-step ${step.status}`}>
            <div className="step-indicator"></div>
            <div className="step-content">
              <span className="step-date">{step.date}</span>
              <span className="step-title">{step.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TrackingTimeline.propTypes = {
  orderDate: PropTypes.string.isRequired,
  getNextDay: PropTypes.func.isRequired
};

export default TrackingTimeline;