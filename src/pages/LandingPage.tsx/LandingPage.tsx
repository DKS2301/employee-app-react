import Header from '../../components/Header'
import banner from '../../assets/images/working-people.png'
import './LandingPage.css'

function LandingPage() {
    return (
        <>
        <Header/>
        <main className='landing-page'>
            <div className="landing-banner">
                <div>
                <img src={banner} alt="Banner image"/>
                </div>
            </div>
            <div className='landing-right'>
                <h4>Keyvalue</h4>
                <h1>Employee Application</h1>
            </div>
        </main>
        </>
  )
}

export default LandingPage