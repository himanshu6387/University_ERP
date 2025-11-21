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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .section-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 100%);
          padding: 20px;
          width: 100%;
          overflow: hidden;
        }

        .circle-layout {
          position: relative;
          width: 100%;
          max-width: 600px;
          aspect-ratio: 1 / 1;
        }

        .center-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          width: 32%;
          height: 32%;
        }

        .logo-circle {
          width: 110%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0.3vw solid #f59e0b;
          border-width: clamp(3px, 0.5vw, 6px);
          padding: 5%;
        }

        .logo-content {
          text-align: center;
          color: #fbbf24;
          width: 100%;
        }

        .logo-title {
          font-weight: bold;
          font-size: clamp(10px, 1.8vw, 16px);
          margin-bottom: 5%;
          line-height: 1.2;
          padding:5px;
        }

        .tree-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 8% 0;
        }

        .tree-trunk {
          width: clamp(8px, 1.5vw, 14px);
          height: clamp(20px, 3.5vw, 35px);
          background-color: #d97706;
          border-radius: 2px;
          position: relative;
        }

        .tree-leaves {
          position: absolute;
          top: -25%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 2px;
        }

        .leaf {
          width: clamp(4px, 0.8vw, 7px);
          height: clamp(8px, 1.5vw, 14px);
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
          font-size: clamp(8px, 1.4vw, 13px);
        }

        .circular-box {
          position: absolute;
          width: 26.67%;
          height: 26.67%;
          border-radius: 50%;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          border: clamp(2px, 0.4vw, 4px) solid white;
          transition: all 0.3s ease;
        }

        .circular-box:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }

        .box-text {
          color: white;
          font-weight: bold;
          text-align: center;
          padding: 0 10%;
          font-size: clamp(11px, 1.8vw, 18px);
          line-height: 1.3;
        }

        .top-left {
          top: 5.33%;
          left: 5.33%;
        }

        .top-right {
          top: 5.33%;
          right: 5.33%;
        }

        .bottom-left {
          bottom: 5.33%;
          left: 5.33%;
        }

        .bottom-right {
          bottom: 5.33%;
          right: 5.33%;
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

        /* Mobile specific adjustments */
        @media (max-width: 768px) {
          .section-container {
            padding: 15px;
          }

          .connecting-lines {
            display: none;
          }

          .logo-circle {
            padding: 8%;
          }
        }

        @media (max-width: 480px) {
          .section-container {
            padding: 10px;
          }

          .center-logo {
            width: 35%;
            height: 35%;
          }

          .circular-box {
            width: 28%;
            height: 28%;
          }

          .logo-circle {
            padding: 6%;
          }
        }
      `}</style>

      <div className="section-container">
        <div className="circle-layout">
          {/* Center Logo */}
          <div className="center-logo">
            <div className="logo-circle">
              <div className="logo-content">
                <div className="logo-title">SRSV EDUCATIONAL AND WELFARE TRUST</div>
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
          <svg className="connecting-lines" viewBox="0 0 600 600" preserveAspectRatio="none">
            <line className="connecting-line" x1="20%" y1="20%" x2="50%" y2="50%" />
            <line className="connecting-line" x1="80%" y1="20%" x2="50%" y2="50%" />
            <line className="connecting-line" x1="20%" y1="80%" x2="50%" y2="50%" />
            <line className="connecting-line" x1="80%" y1="80%" x2="50%" y2="50%" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default NewSection;