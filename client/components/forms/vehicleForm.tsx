import { FormGroup, Label, Input, Button } from "reactstrap"
import { Vehicle } from "../../utils/customer"


export default (props : {vehicleChangeHandler : Function, handleSubmit : Function | null, vehicle : Vehicle | undefined}) => {


    return (
        <div className="border rounded border-dark p-4">
        <h3 className="text-center">Vehicle</h3>
        <div className="d-flex gap-4">
            <div>
                <FormGroup>
                    <Label for="year">
                        Year
                    </Label>
                    <Input
                    id="year"
                    name="year"
                    type="number"
                    value={props.vehicle?.year}
                    onChange={(e) => props.vehicleChangeHandler(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="make">
                        Make
                    </Label>
                    <Input
                    id="make"
                    name="make"
                    value={props.vehicle?.make}
                    onChange={(e) => props.vehicleChangeHandler(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="model">
                        Model
                    </Label>
                    <Input
                    id="model"
                    name="model"
                    value={props.vehicle?.model}
                    onChange={(e) => props.vehicleChangeHandler(e)}
                    />
                </FormGroup>
            </div>
            <div>
                <FormGroup>
                    <Label for="vin">
                        Vin
                    </Label>
                    <Input
                    id="vin"
                    name="vin"
                    value={props.vehicle?.vin}
                    onChange={(e) => props.vehicleChangeHandler(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="plate">
                        Plate
                    </Label>
                    <Input
                    id="plate"
                    name="plate"
                    value={props.vehicle?.plate}
                    onChange={(e) => props.vehicleChangeHandler(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="engineSize">
                        Engine Size
                    </Label>
                    <Input
                    type="number"
                    id="engineSize"
                    name="engineSize"
                    value={props.vehicle?.engineSize}
                    onChange={(e) => props.vehicleChangeHandler(e)}
                    />
                                            </FormGroup>
                                            <br/>
            <div className="d-flex justify-content-end pt-4 ">
                        <Button type="button" onClick={(e) => props.handleSubmit(e)}>
                            Submit
                        </Button>
                                    </div>
            </div>
                        </div>
                        </div>
    )
}