import Toast from 'react-bootstrap/Toast';

function SAlert({title,body,color}) {
  return (
    <>
 
        <Toast style={{zIndex:'99',position:'absolute',top:'65px'}}
          className="d-inline-block m-1"
          bg={color.toLowerCase()}
    
        >
          <Toast.Header>
            {/* <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            /> */}
            <strong className="me-auto">{title}</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body className={'text-white'}>
           {body}
          </Toast.Body>
        </Toast>

    </>
  );
}

export default SAlert;