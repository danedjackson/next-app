import useSWR from "swr"
import fetcher from '../utils/fetcher';

const useFetch = (url) => {
    const {data, error, mutate} = useSWR(url, fetcher, {
        revalidateOnFocus: false
    })

    return {
        data,
        error,
        mutate
    }
}

export default useFetch