
const UserProfile = (props) => {
       return (
	       <div style={{ border: '1px solid gray', borderRadius: '8px', padding: '10px', margin: '10px', backgroundColor: '#f9f9f9', maxWidth: '400px' }}>
		       <h2 style={{ color: 'blue', fontSize: '2rem', marginBottom: '8px' }}>{props.name}</h2>
		       <p style={{ fontSize: '1.1rem', margin: '6px 0' }}>Age: <span style={{ fontWeight: 'bold', color: '#333' }}>{props.age}</span></p>
		       <p style={{ fontSize: '1rem', color: '#555', margin: '6px 0' }}>Bio: {props.bio}</p>
	       </div>
       );
};

export default UserProfile;
