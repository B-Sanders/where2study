import React from "react";
import {FlexboxGrid, SelectPicker, Rate, Input, Button, Icon, InputPicker, DatePicker, Divider} from 'rsuite';
import locationData from "../locations.json";
import classData from "../courses.json";

const inputStyles = { 
  width: 224, display: 'block', marginBottom: 10 
};

const noiseData = [
    {
        "label": <Rate readOnly value={1} size="xs" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} />,
        "value": 1
    },
    {
        "label": <Rate readOnly value={2} size="xs" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} />,
        "value": 2
    },
    {
        "label": <Rate readOnly value={3} size="xs" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} />,
        "value": 3
    },
    {
        "label": <Rate readOnly value={4} size="xs" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} />,
        "value": 4
    },
    {
        "label": <Rate readOnly value={5} size="xs" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} />,
        "value": 5
    }

];

class SearchBar extends React.Component{


    constructor(props){
        super(props);
        this.state = {
          filters: [null, null, null, null]
        };
        this.changeFilter = this.changeFilter.bind(this)
    }

    changeFilter(e, index){
        let newFilters = this.state.filters;
        newFilters[index] = e;
        this.setState({
           filters: newFilters
        });
        this.props.handleFilterChange(newFilters);
    }

    render(){
        return(
            <FlexboxGrid justify="center" >
                <FlexboxGrid.Item>
                  <SelectPicker
                  size="lg"
                  placeholder="Search by Location"
                  data={locationData}
                  style={inputStyles}
                  onChange={(e) => this.changeFilter(e, 0)}
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <SelectPicker
                  size="lg"
                  placeholder="Search by Class"
                  data={classData}
                  style={inputStyles}
                  onChange={(e) => this.changeFilter(e, 1)}
                  />
                </FlexboxGrid.Item>
                 <FlexboxGrid.Item>
                  <InputPicker
                  size="lg"
                  placeholder="Search by Noise Level"
                  data={noiseData}
                  style={inputStyles}
                  onChange={(e) => this.changeFilter(e, 2)}
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                   <DatePicker
                       size="lg"
                       placeholder="Search by Estimated End Time"
                       format="HH:mm"
                       ranges={[]}
                       onChange={(e) => this.changeFilter(e, 3)}
                   />
                </FlexboxGrid.Item>
            </FlexboxGrid>
        )
    }
}

export default SearchBar;