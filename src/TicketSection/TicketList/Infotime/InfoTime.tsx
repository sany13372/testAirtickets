import {FC} from 'react';
import styles from './InfoTime.module.scss'
const InfoTime:FC<{time:string,date:string,place:string}> = ({time,date,place}) => {
    return (
        <div className={styles.info}>
            <h2>{time}</h2>
            <h6>{place}</h6>
            <span>{date}</span>
        </div>
    );
}

export default InfoTime;