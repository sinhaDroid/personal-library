import React from 'react';

export default () => {
  return (
    <footer className="page-footer p-2 amber lighten-1">
      <div className="container center">
        <div className="row">
          <div className="col l6 s12 grey-text text-darken-4">
            &lt;/&gt; by <a href="https://aaronmassey.pro">Aaron Massey</a>
          </div>
          <div className="col l6 s12 grey-text text-darken-4">
            View this project's code on{' '}
            <a
              href="https://github.com/aaronmassey45/personal-library"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
