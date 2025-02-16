const Footer=()=>{
    const date=new Date()
    const currentYear=date.getFullYear()

    return (
        <footer className="text-center container ">
            <div className="row  gap-3 pt-5 pb-5">
       {/* <div className="col-md-4">

       </div> */}
       <div className="col-md-12">
       <p>© {currentYear} LastForecast - All Rights Reserved  </p>     
        </div>       
        </div>
       
        </footer>
        
    )
}
export default Footer;