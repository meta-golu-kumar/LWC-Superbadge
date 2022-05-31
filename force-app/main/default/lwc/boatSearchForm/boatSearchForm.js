import { LightningElement, track, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';

    // Private
    error = undefined;
    @track
    searchOptions;

    // Wire a custom Apex method
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
        if (data) {
            console.log(data);
            this.searchOptions = data.map(type => ({
                label: type.Name,
                value: type.Id
            }));
            //console.log(this.searchOptions);
            this.searchOptions.unshift({ label: 'All Types', value: '' });
            // console.log(this.searchOptions);
        } else if (error) {
            this.searchOptions = undefined;
            this.error = error;
            console.log(error);
        }
    }

    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
        // Create the const searchEvent
        // searchEvent must be the new custom event search
        this.selectedBoatTypeId = event.target.value;
        // console.log('called');
        const searchEvent = new CustomEvent('search', {
            detail: {
                boatTypeId: this.selectedBoatTypeId
            }
        });
        this.dispatchEvent(searchEvent);
        // console.log(this.selectedBoatTypeId);
    }
}