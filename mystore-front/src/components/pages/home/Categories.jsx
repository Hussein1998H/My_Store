import ListGroup from 'react-bootstrap/ListGroup';
import styles from './home.module.scss'
import Loading from '../../shared/Loading';
import { useContext } from 'react';
import { AppContext } from '../../layout/Layout';
export default function Categories({ categories }) {
    // init app state
    const appContext = useContext(AppContext)

    return (

        <ListGroup className={styles.categories} horizontal>
 <ListGroup.Item onClick={()=>{
          appContext.setCategory('')
      
      }} className={styles.item}>All</ListGroup.Item>       
            {
                (categories == null || categories.length == 0) ?
                    <Loading />
                    : categories.map((el) => {
                        let classX = styles.item
                        const isSelected = (el.name == appContext.appState.category)
                        if (isSelected) {
                            classX = classX + ' ' + styles.active;
                        }
                        const updateCategory = (e) => {
                            if (isSelected)
                                appContext.setCategory(null)
                            else
                                appContext.setCategory(el.name)
                        }
                        return <ListGroup.Item key={el.id} className={classX} onClick={updateCategory}>{el.name} </ListGroup.Item>
                    })}
        </ListGroup>
    );
}