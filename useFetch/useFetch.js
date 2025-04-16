import { useEffect, useState } from "react"



const localCache = {}

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    })


    useEffect(() => {

        getFetch()

    }, [url])


    //Para que carge siempre al inicio y luego en el getFetch se asigna
    const setLoadingState = () => {
        setState({
            data:null,
            isLoading: true,
            hasError: false,
            error: null
        })
    }


    const getFetch = async () => {

        if (localCache[url]) {
            console.log('Paso por el cache');
            
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            })
            return
        }
        setLoadingState()

        const resp = await fetch(url) //Realizo la peticion}

        //sleep
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (!resp.ok) {
            setState({
                ...state,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            })
            return
        }

        const data = await resp.json() //La guardo como JSON

        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        })
        // console.log(data);

        //Manejo del cache proximamente
        localCache[url] = data
    }


    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}


