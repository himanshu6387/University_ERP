import React from 'react';

const NewSection = () => {
  const items = [
    { id: 1, text: '80G 12 A', position: 'top-left' },
    { id: 2, text: 'NGO Darpan', position: 'top-right' },
    { id: 3, text: 'Niti Aayog', position: 'bottom-left' },
    { id: 4, text: 'E-Anudan', position: 'bottom-right' }
  ];

  return (
    <>
      <style>{`
        .section-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 100%);
          padding: 40px;
        }

        .circle-layout {
          position: relative;
          width: 600px;
          height: 600px;
        }

        .center-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .logo-circle {
          width: 192px;
          height: 192px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #f59e0b;
        }

        .logo-content {
          text-align: center;
          color: #fbbf24;
        }

        .logo-title {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 8px;
        }

        .tree-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 12px 0;
        }

        .tree-trunk {
          width: 12px;
          height: 32px;
          background-color: #d97706;
          border-radius: 2px;
          position: relative;
        }

        .tree-leaves {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4px;
        }

        .leaf {
          width: 6px;
          height: 12px;
          background-color: #22c55e;
          border-radius: 50%;
        }

        .leaf:nth-child(1) { transform: rotate(-30deg); }
        .leaf:nth-child(2) { transform: rotate(-15deg); }
        .leaf:nth-child(3) { transform: rotate(0deg); }
        .leaf:nth-child(4) { transform: rotate(15deg); }
        .leaf:nth-child(5) { transform: rotate(30deg); }

        .logo-subtitle {
          font-weight: 600;
          font-size: 14px;
        }

        .circular-box {
          position: absolute;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid white;
          transition: all 0.3s ease;
        }

        .circular-box:hover {
          transform: scale(1.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
        }

        .box-text {
          color: white;
          font-weight: bold;
          text-align: center;
          padding: 0 16px;
          font-size: 18px;
        }

        .top-left {
          top: 32px;
          left: 32px;
        }

        .top-right {
          top: 32px;
          right: 32px;
        }

        .bottom-left {
          bottom: 32px;
          left: 32px;
        }

        .bottom-right {
          bottom: 32px;
          right: 32px;
        }

        .connecting-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .connecting-line {
          stroke: #e5e7eb;
          stroke-width: 2;
          stroke-dasharray: 5, 5;
          opacity: 0.3;
        }
      `}</style>

      <div className="section-container">
        <div className="circle-layout">
          {/* Center Logo */}
          <div className="center-logo">
            <div className="logo-circle">
              <div className="logo-content">
                <div className="logo-title">SRSV ED & W TRUST</div>
                <div className="tree-container">
                  <div className="tree-trunk">
                    <div className="tree-leaves">
                      <div className="leaf"></div>
                      <div className="leaf"></div>
                      <div className="leaf"></div>
                      <div className="leaf"></div>
                      <div className="leaf"></div>
                    </div>
                  </div>
                </div>
                <div className="logo-subtitle">TRUST (Reg.)</div>
              </div>
            </div>
          </div>

          {/* Four Circular Boxes */}
          {items.map((item) => (
            <div key={item.id} className={`circular-box ${item.position}`}>
              <span className="box-text">{item.text}</span>
            </div>
          ))}

          {/* Connecting Lines */}
          <svg className="connecting-lines">
            <line className="connecting-line" x1="120" y1="120" x2="300" y2="300" />
            <line className="connecting-line" x1="480" y1="120" x2="300" y2="300" />
            <line className="connecting-line" x1="120" y1="480" x2="300" y2="300" />
            <line className="connecting-line" x1="480" y1="480" x2="300" y2="300" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default NewSection;