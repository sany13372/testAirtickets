import { Button, Card } from '@mantine/core';
import { FC } from 'react';
import ImgAir from '../../../public/AirImg.jpg';
import InfoTime from "./Infotime/InfoTime";
import ImgAirPlane from "./../../../public/black-plane.png";
import styles from './TicketListItem.module.scss';
import { PriceValueType } from "../TicketFilters";
import { ITicket } from "../../types";

// Курсы валют относительно RUB
const currencyRates: Record<PriceValueType, number> = {
    RUB: 1,
    USD: 0.013,
    EUR: 0.012,
};

const TicketListItem: FC<{ ticket: ITicket; currency: PriceValueType }> = ({ ticket, currency }) => {
    const placeDeparture = `${ticket.origin}, ${ticket.origin_name}`;
    const placeArrival = `${ticket.destination_name}, ${ticket.destination}`;

    const convertedPrice = currencyRates[currency]
        ? Math.round(ticket.price * currencyRates[currency])
        : ticket.price;

    const getStopsText = (stops: number) => {
        switch (stops) {
            case 0:
                return 'Без пересадок';
            case 1:
                return '1 пересадка';
            default:
                return `${stops} пересадки`;
        }
    };

    return (
        <Card shadow="sm" className={styles.mainBlock}>
            <div>
                <img src={ImgAir} alt="Airline Logo" />
                <Button variant="filled" color="orange" size="lg">
                    Купить <br /> за {convertedPrice} {currency}
                </Button>
            </div>

            <div>
                <InfoTime
                    time={ticket.departure_time}
                    date={ticket.departure_date}
                    place={placeDeparture}
                />

                <div className={styles.blockStop}>
                    <span>{getStopsText(ticket.stops)}</span>
                    <div>
                        <div></div>
                        <img src={ImgAirPlane} alt="Plane Icon" />
                    </div>
                </div>

                <InfoTime
                    time={ticket.arrival_time}
                    date={ticket.arrival_date}
                    place={placeArrival}
                />
            </div>
        </Card>
    );
};

export default TicketListItem;
