interface DeviceFrameProps {
  type: 'laptop' | 'mobile';
  children: React.ReactNode;
}

export function DeviceFrame({ type, children }: DeviceFrameProps) {
  if (type === 'laptop') {
    return (
      <div className="device-laptop">
        <div className="device-laptop__lid">
          <div className="device-laptop__camera" aria-hidden="true" />
          <div className="device-laptop__screen">
            {children}
          </div>
        </div>
        <div className="device-laptop__base" aria-hidden="true">
          <div className="device-laptop__latch" />
        </div>
      </div>
    );
  }

  return (
    <div className="device-mobile">
      <div className="device-mobile__btn-vol" aria-hidden="true">
        <span /><span />
      </div>
      <div className="device-mobile__btn-power" aria-hidden="true">
        <span />
      </div>
      <div className="device-mobile__shell">
        <div className="device-mobile__camera" aria-hidden="true" />
        <div className="device-mobile__screen">
          {children}
        </div>
      </div>
    </div>
  );
}
