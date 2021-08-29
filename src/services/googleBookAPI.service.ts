// API Key: AIzaSyBmj0aMbhhXWz2pvkD_GNCGByDZrEo33vA

import axios from 'axios';

/**
 *  GET THE BOOK BY ISBN
 *  GET https://www.googleapis.com/books/v1/volumes?q={search terms}
 *
 * Search terms:
 *
 *  intitle: Returns results where the text following this keyword is found in the title.
 inauthor: Returns results where the text following this keyword is found in the author.
 inpublisher: Returns results where the text following this keyword is found in the publisher.
 subject: Returns results where the text following this keyword is listed in the category list of the volume.
 isbn: Returns results where the text following this keyword is the ISBN number.
 lccn: Returns results where the text following this keyword is the Library of Congress Control Number.
 oclc: Returns results where the text following this keyword is the Online Computer Library Center number.
 *
 */

const API_KEY = "AIzaSyBmj0aMbhhXWz2pvkD_GNCGByDZrEo33vA"

interface SearchResult {
    kind: "string"
    items?: GoogleAPIBookVolume[]
    totalItems: number
}

const getBookByISBN = async (isbn: string): Promise<GoogleAPIBookVolume> => {

    try {
        const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)

        const data = result.data as SearchResult

        if (data.items) {
            return Promise.resolve(data.items[0])
        }
        return Promise.reject()
    } catch (r) {
        return Promise.reject()
    }
}


export const GoogleBookAPIService = {
    getBookByISBN
}
