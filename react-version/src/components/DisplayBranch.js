
import '../styles/DisplayBranch.css';
import dounts_2 from '../images/dounts_2.jpeg';

const DisplayBranch = ({ showBranch, city }) => {
    return (
        <div className='cards-container'>
            {showBranch[0] && (
                <div className='card'>
                    <h1>{`${showBranch[0].branch} - ${city[0].cityName}`}</h1>
                    <p>Address: {showBranch[0].address}</p>
                    <p>Phone: {showBranch[0].phone}</p>
                    <img src={dounts_2} alt='dounts' className='image'/>
                    <p className='text' style={{ fontWeight: 'bold' }}>No Image</p>
                </div>
            )}
        </div>
    )
};

export default DisplayBranch;