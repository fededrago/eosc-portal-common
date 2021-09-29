export function EoscMainFooterLogoBar() {
  return (
    <div className="row h-100">
      <div className="col-md-3 my-auto">
        <a className="eosc-logo-mono d-block" href="https://eosc-portal.eu">
          <img
            src="https://marketplace.eosc-portal.eu/packs/media/images/eosc-logo-mono-eceb9ad05d4123200a20b9640278973f.png"/>
        </a>
      </div>
      <div className="col-md-9 my-auto copyright">
          <span className="copy-text">
            Copyright 2020 - All rights reserved
          </span>
        <a className="ml-4 text-uppercase" href="https://eosc-portal.eu/privacy-policy-summary">
          privacy policy
        </a>
      </div>
    </div>
  );
}