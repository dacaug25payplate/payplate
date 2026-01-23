// function Header(){
//     return () =>{

//     }


// }
import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <div className="container-fluid">

                {/* Left side – Logo */}
                <Link to="/" className="navbar-brand fw-bold text-primary">
                    PayPlate
                </Link>

                {/* Right side – Buttons */}
                <div className="d-flex">
                    <Link to="/login" className="btn btn-sm btn-success me-2">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-sm btn-primary">
                        Register
                    </Link>
                </div>

            </div>
        </nav>
    )
}

// <nav className="container-fluid px-4">
//   <div className="d-flex align-items-center justify-content-between">

//     <a href="/" className="h4 mb-0 text-primary text-decoration-none">
//       PayPlate
//     </a>

{/* CENTER : Nav items */ }
{/* <ul className="nav mx-auto">
          <li className="nav-item">
            <a href="#" className="nav-link text-secondary">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-primary">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-primary">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-primary">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-primary">
              About
            </a>
          </li>
        </ul> */}

{/* <div>
          <Link to="/login" className="btn btn-sm btn-success me-2">Login</Link>
          <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
        </div>
      </div>
    </nav> */}
//   );
// }

export default Header;
