import { REQUEST_DETAILS, REQUEST_FAILED, REQUEST_OFFER_RENT, REQUEST_DELETE_INFO, REQUEST_GOOGLE_API_FIND_ADDRESS, REQUEST_GOOGLE_API_GET_PROVINCE_LOCATION } from "./types"

export const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case REQUEST_GOOGLE_API_FIND_ADDRESS:
            const data = JSON.parse(payload).predictions;
            const addresses = [];
            data.forEach((item, index) => {
                let addressArray = item.description.split(',');
                let prov = addressArray[addressArray.length - 2].trim();
                if (prov === state.provinceSelected.trim()) {
                    let elem = {
                        value: item.description,
                        label: item.description,
                    };
                    addresses.push(elem);
                }
            });
            return { ...state, addresses }
        case REQUEST_GOOGLE_API_GET_PROVINCE_LOCATION:
            const location = JSON.parse(payload).results[0].geometry.bounds;
            const provinceSelected = JSON.parse(payload).results[0].address_components[0].short_name;
            return { ...state, location, provinceSelected }
        case REQUEST_DETAILS:
            return { ...state, responseDetails: JSON.parse(payload) }
        case REQUEST_OFFER_RENT:
            return { ...state, offerRent: state.offerRent.concat([JSON.parse(payload)]) }
        case REQUEST_DELETE_INFO:
            return {
                ...state,
                responseDetails: null,
                offerRent: null,
                city: '',
                addresses: [],
                errors: null,
                location: null,
                provinceSelected: '',
            }
        case REQUEST_FAILED:
            return { ...state, errors: payload }
        default:
            return { ...state, ...payload }
    }
}
