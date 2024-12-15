import { FC, useState } from "react";
import { Card, Checkbox, Button, Select } from "@mantine/core";
import styles from "./TicketFilters.module.scss";

const stopsFilter = {
    all: "Все",
    nostop: "Без пересадок",
    onestop: "1 пересадка",
    twostop: "2 пересадки",
    thirdstop: "3 пересадки",
} as const;

const priceValue = {
    RUB: "RUB",
    USD: "USD",
    EUR: "EUR",
} as const;

export type PriceValueType = keyof typeof priceValue;

const sortOptions = {
    cheapest: "Самый дешевый",
    fastest: "Самый быстрый",
} as const;

type SortOption = keyof typeof sortOptions;

interface TicketFiltersProps {
    onCurrencyChange: (currency: PriceValueType) => void;
    onStopsChange: (stops: number[]) => void;
    onSortChange: (sort: SortOption) => void;
}

export const TicketFilters: FC<TicketFiltersProps> = ({
                                                          onCurrencyChange,
                                                          onStopsChange,
                                                          onSortChange,
                                                      }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<PriceValueType>("RUB");
    const [selectedStops, setSelectedStops] = useState<string[]>([]);
    const [selectedSort, setSelectedSort] = useState<SortOption>("cheapest");

    const handleStopsChange = (values: string[]) => {
        const isAllSelected = values.includes("Все");
        const previouslyAllSelected = selectedStops.includes("Все");

        if (isAllSelected && !previouslyAllSelected) {
            const allValues = Object.values(stopsFilter);
            setSelectedStops(allValues);
            onStopsChange([0, 1, 2, 3]);
        } else {
            const filteredValues = values.filter((value) => value !== "Все");
            setSelectedStops(filteredValues);

            const stops = filteredValues.map((value) => {
                switch (value) {
                    case stopsFilter.nostop:
                        return 0;
                    case stopsFilter.onestop:
                        return 1;
                    case stopsFilter.twostop:
                        return 2;
                    case stopsFilter.thirdstop:
                        return 3;
                    default:
                        return -1;
                }
            });
            onStopsChange(stops.filter((stop) => stop >= 0));
        }
    };

    return (
        <Card shadow="sm" className={styles.card}>
            <span>Валюта</span>
            <Button.Group>
                {Object.keys(priceValue).map((currency) => (
                    <Button
                        key={currency}
                        variant={selectedCurrency === currency ? "filled" : "default"}
                        onClick={() => {
                            setSelectedCurrency(currency as PriceValueType);
                            onCurrencyChange(currency as PriceValueType);
                        }}
                    >
                        {currency}
                    </Button>
                ))}
            </Button.Group>

            <span>Количество пересадок</span>
            <Checkbox.Group
                value={selectedStops}
                onChange={handleStopsChange}
                withAsterisk
            >
                {Object.values(stopsFilter).map((label) => (
                    <Checkbox
                        key={label}
                        value={label}
                        className={styles.checkbox}
                        label={<div className={styles.label}>{label}</div>}
                    />
                ))}
            </Checkbox.Group>

            <span>Сортировка</span>
            <Select
                data={Object.values(sortOptions)}
                value={sortOptions[selectedSort]}
                onChange={(value) => {
                    const sortKey = Object.keys(sortOptions).find(
                        (key) => sortOptions[key as SortOption] === value
                    ) as SortOption;
                    setSelectedSort(sortKey);
                    onSortChange(sortKey);
                }}
            />
        </Card>
    );
};
