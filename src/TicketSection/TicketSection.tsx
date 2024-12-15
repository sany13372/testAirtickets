import { FC, useState, useEffect } from "react";
import styles from "./TicketSection.module.scss";
import {TicketFilters} from "./TicketFilters";
import TicketList from "./TicketList/TicketList";
import {ITicket} from "../types";
import {calculateFlightDuration} from "../utils";

type TicketSectionType = Omit<ITicket, "duration">

const TicketSection: FC<{ tickets: TicketSectionType[] }> = ({ tickets }) => {
    const [currency, setCurrency] = useState<"RUB" | "USD" | "EUR">("RUB");
    const [stops, setStops] = useState<number[]>([]);
    const [sort, setSort] = useState<"cheapest" | "fastest">("cheapest");
    const [filteredTickets, setFilteredTickets] = useState<ITicket[]>(tickets as ITicket[]);

    useEffect(() => {
        let updatedTickets = [...tickets.map((tic) => {
            return {...tic,duration:calculateFlightDuration(tic.departure_time,tic.arrival_time)}
        })];

        // Фильтрация по пересадкам
        if (stops.length > 0) {
            updatedTickets = updatedTickets.filter((ticket) =>
                stops.includes(ticket.stops)
            );
        }

        // Сортировка
        if (sort === "cheapest") {
            updatedTickets.sort((a, b) => a.price - b.price);
        } else if (sort === "fastest") {
            updatedTickets.sort((a, b) => a.duration - b.duration);
        }

        setFilteredTickets(updatedTickets);
    }, [tickets, stops, sort]);

    return (
        <div className={styles.section}>
            <TicketFilters
                onCurrencyChange={setCurrency}
                onStopsChange={setStops}
                onSortChange={setSort}
            />
            <TicketList ticketList={filteredTickets} currency={currency} />
        </div>
    );
};

export default TicketSection;
