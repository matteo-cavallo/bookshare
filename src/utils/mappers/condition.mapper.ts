import {BookCondition} from 'model/book.model';

export const conditionMapper = (key?: string): string => {

    switch (key as BookCondition) {
        case BookCondition.AS_NEW:
            return "Nuovo"
        case BookCondition.NEW:
            return "Ottime condizioni"
        case BookCondition.USED:
            return "Con qualche segno di usura"
        case BookCondition.RUINED:
            return "Usurato"
        default:
            return "Non riportato"
    }
}
