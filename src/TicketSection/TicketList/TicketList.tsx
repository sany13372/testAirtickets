import {FC} from 'react';
import TicketListItem from "./TicketListItem";
import {ITicket} from "../../types";
import {PriceValueType} from "../TicketFilters";

const TicketList:FC<{ticketList:ITicket[],currency:PriceValueType}> = ({ticketList,currency}) => {
    return (
        <div>
            {ticketList.length > 0 ? ticketList.map((ticket) => <TicketListItem key={ticket.price} ticket={ticket} currency={currency} /> ) : <h2>Данных билетов в наличии нет</h2>}
        </div>
    );
 }

export default TicketList;
