import React from "react";

const Footer = () => {
  return (
    <>
     <footer
       className="text-center text-lg-start text-danger px-0 px-lg-3"
       sticky="bottom" 
  
       style={{ position: 'fixed', bottom: '0', width: '100%', padding: '2px',backgroundColor:'black'}}>
       <div className="container text-center text-md-start mt-2">
         <div className="row">

          <div className="col-md-4 col-lg-9 col-xl-3 mx-auto mb-md-0">
             <h6 className="fw-bold">Useful Links</h6>
             <hr
               className="mb-2 mt-0 d-inline-block mx-auto"
               style={{ width: "60px", color: "#ffffff", height: "2px" }}
             />
             <p>
               <i className="fas fa-envelope mr-3"></i>
               <a
                 href="https://marketplace.verizon.com/#/dataQuality"
                 className="text-decoration-none text"
                 style={{ color: "white" }}>
                 Data Quality Dashboard
               </a>
             </p>
             <p>
               <i className="fas fa-envelope mr-3"></i>
               <a
                 href="https://marketplace.verizon.com/#/dqreports"
                 className="text-decoration-none text"
                 style={{ color: "white" }}>
                 Auto Profile Dashboard
               </a>
             </p>
           </div>

           <div className="col-md-4 col-lg-9 col-xl-8 mx-auto mb-md-0">
             <h6 className="fw-bold">Contact Us</h6>
             <hr
               className="mb-2 mt-0 d-inline-block mx-auto"
               style={{ width: "60px", color: "#ffffff", height: "2px" }}
             />
             <p>
               <i className="fas fa-envelope mr-3"></i>
               <a
                 href="mailto:DQ-DEV-Team@verizon.com"
                 className="text-decoration-none text"
                 style={{ color: "white" }}>
                 DQ-DEV-Team@verizon.com
               </a>
             </p>
           </div>
           <div className="col-md-4 col-lg-3 col-xl-1 mb-xl-5 mt-xl-5">
           <img src="verizon.png" style={{width:"70px"}}/>
           </div>
      
         </div>
       </div>
     </footer>








{/* <div class="container my-5">

  <footer
          class="text-center text-lg-start text-white"
          style="background-color: #1c2331"
          >

    <section
             class="d-flex justify-content-between p-4"
             style="background-color: #6351ce">
      <div class="me-5">
        <span>Get connected with us on social networks:</span>
      </div>

      <div>
        <a href="" class="text-white me-4">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-google"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-github"></i>
        </a>
      </div>

    </section>



    <section class="">
      <div class="container text-center text-md-start mt-5">
 
        <div class="row mt-3">
    
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
   
            <h6 class="text-uppercase fw-bold">Company name</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style="width: 60px; background-color: #7c4dff; height: 2px"
                />
            <p>
              Here you can use rows and columns to organize your footer
              content. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </p>
          </div>
 
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
   \
            <h6 class="text-uppercase fw-bold">Products</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style="width: 60px; background-color: #7c4dff; height: 2px"
                />
            <p>
              <a href="#!" class="text-white">MDBootstrap</a>
            </p>
            <p>
              <a href="#!" class="text-white">MDWordPress</a>
            </p>
            <p>
              <a href="#!" class="text-white">BrandFlow</a>
            </p>
            <p>
              <a href="#!" class="text-white">Bootstrap Angular</a>
            </p>
          </div>

          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

            <h6 class="text-uppercase fw-bold">Useful links</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style="width: 60px; background-color: #7c4dff; height: 2px"
                />
            <p>
              <a href="#!" class="text-white">Your Account</a>
            </p>
            <p>
              <a href="#!" class="text-white">Become an Affiliate</a>
            </p>
            <p>
              <a href="#!" class="text-white">Shipping Rates</a>
            </p>
            <p>
              <a href="#!" class="text-white">Help</a>
            </p>
          </div>

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
     
            <h6 class="text-uppercase fw-bold">Contact</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style="width: 60px; background-color: #7c4dff; height: 2px"
                />
            <p><i class="fas fa-home mr-3"></i> New York, NY 10012, US</p>
            <p><i class="fas fa-envelope mr-3"></i> info@example.com</p>
            <p><i class="fas fa-phone mr-3"></i> + 01 234 567 88</p>
            <p><i class="fas fa-print mr-3"></i> + 01 234 567 89</p>
          </div>
        
        </div>
   
      </div>
    </section>
   
    <div
         class="text-center p-3"
         style="background-color: rgba(0, 0, 0, 0.2)"
         >
      © 2020 Copyright:
      <a class="text-white" href="https://mdbootstrap.com/"
         >MDBootstrap.com</a
        >
    </div>

  </footer>


</div> */}

</>
  );
};

export default Footer;
