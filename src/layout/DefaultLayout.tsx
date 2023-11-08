import Navbar from './Navbar';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
    return(
        <div>
            <Navbar/>
            <div className='container'>
                {children}
            </div>
        </div>
    )
}
export default DefaultLayout