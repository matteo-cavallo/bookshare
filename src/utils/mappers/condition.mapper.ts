import {BookConditions} from 'model/book.model';

export const conditionMapper = (key?: string): string => {

    switch (key as BookConditions) {
        case BookConditions.AS_NEW:
            return "Nuovo"
        case BookConditions.NEW:
            return "Ottime condizioni"
        case BookConditions.USED:
            return "Con qualche segno di usura"
        case BookConditions.RUINED:
            return "Usurato"
        default:
            return "Non riportato"
    }
}
