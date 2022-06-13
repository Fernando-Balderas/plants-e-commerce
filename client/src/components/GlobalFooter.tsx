import { AiFillTwitterCircle } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import {
  TiSocialInstagramCircular,
  TiSocialLinkedinCircular,
} from 'react-icons/ti'

function GlobalFooter() {
  return (
    <footer className="bg-white">
      {/* <hr /> */}
      <div className="container">
        <div className="row py-4 justify-content-md-center">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <p className="text-muted" style={{ fontStyle: 'italic' }}>
              Support local farmers.
            </p>
            <ul className="list-inline mt-4">
              <li className="list-inline-item">
                <a
                  href="https://www.linkedin.com/in/fernando-balderas-guzman/"
                  target="_blank"
                  rel="noreferrer"
                  title="Linkedin"
                >
                  <TiSocialLinkedinCircular size="2.2em" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" target="_blank" rel="noreferrer" title="Twitter">
                  <AiFillTwitterCircle size="1.85em" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" target="_blank" rel="noreferrer" title="Facebook">
                  <BsFacebook size="1.6em" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" target="_blank" rel="noreferrer" title="Instagram">
                  <TiSocialInstagramCircular size="2.1em" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Shop</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Trees
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Fruits
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Company</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-muted">
                  About us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-light py-3">
        <div className="container text-center">
          <p className="text-muted mb-0 py-2">
            © 2022 Fernando Balderas All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default GlobalFooter
