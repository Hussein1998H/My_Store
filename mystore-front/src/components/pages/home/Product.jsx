import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './home.module.scss'
import { BaseUrl } from '../../../tools/api';
import { NavLink } from 'react-router-dom';

function Product({ product }) {
    
    // https://placehold.co/180x100
    return (
        <Card className={styles.product}>
            <Card.Img className={styles.image} variant="top" src={`${BaseUrl}/${product.image}`} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.description}
                </Card.Text>
                <Card.Text style={{ fontWeight: 'bold' }}>
                    Price: {product.price}$
                </Card.Text>
                <Button  variant="primary"><NavLink to={`/product/${product.id}`}  className={styles.item} >View</NavLink></Button>
            </Card.Body>
        </Card>
    );
}

export default Product;