const NewsLetter=()=>{
    return (
        <section className="newsletter">
            <div className="container">

           
            <div className="row">
<div className="col-md-8">
<h3> Subscribe for weekly updates</h3>
</div>
          <div className="col-md-4">
            <form>
                <input type="email" placeholder="Enter your email adress..." required></input>
                <button type="submit" className="btn"> Subscribe</button>
            </form>
            </div>
            </div>
            </div>
        </section>
    )
}
export default NewsLetter;