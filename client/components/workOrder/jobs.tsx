import Cookies from "js-cookie"
import { FormEvent, useEffect, useState } from "react"
import { Button, Form, Input, Table } from "reactstrap"
import { Jobs } from "../../utils/jobsTable"



export default () => {
    const [jobs, setJobs] = useState<Jobs[]>([])
    const [task, setTask] = useState<String>();
    const [part, setPart] = useState<number>();
    const [labor, setLabor] = useState<number>();
    const [quantity, setQuantity] = useState<number>();

    useEffect(() => {
        Cookies.get('jobs') && setJobs(JSON.parse(Cookies.get('jobs')) )
    },[])

    const addRow = () => {
        setJobs([...jobs, { Id: jobs.length + 1 }])
        
    }
    const handleEdit = (i : number) => {
        const data = [...jobs]
        for (let j = 0; j < data.length; j++) {
            if (i === j){
                data[j] = {
                    ...data[j],
                    disabled : false,
                }
                setTask(data[j].Task)
                setLabor(data[j].Labor)
                setPart(data[j].Part)
                setQuantity(data[j].Quantity)
            } else {
                data[j] = {
                    ...data[j],
                    disabled : true
                }
            }
        }
        setJobs(data)
    }

    const handleSubmit = (i: number) => {
        console.log(i)
        const data = [...jobs]
        data[i] = {
            Id : jobs[i].Id,
            Task : task,
            Part : part,
            Labor : labor,
            Quantity : quantity,
            Total :( parseFloat(part) + parseFloat(labor)) * parseFloat(quantity),
            disabled: true
        }
        setJobs(data)
        Cookies.set('jobs',JSON.stringify(data), {path: '/'})
    }
    console.log(jobs)



    return (
        <div className="d-flex justify-content-center pt-4">
            <Form className=" ">
            
            <Table className="table border table-border border-color-dark table-hover">
                    <thead>
                        <tr className="">
                            <td className="">#</td>
                            <td className="">Task</td>
                            <td className="">Part</td>
                            <td className="">Labor</td>
                            <td className="">Quantity</td>
                            <td className="">Total</td>
                            <td className=""></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map((item, i) => {
                                return (
            
                                    <tr className="">
                                        <td className="">{i + 1}</td>
                                        <td className="">
                                            <Input
                                                id="Task"
                                                name="Task"
                                                placeholder={item.Task}
                                                type="text"
                                                disabled={item.disabled}
                                                onChange={(e) => setTask(e.target.value)}
                                                />
                                        </td>
                                        <td className="">
                                            <Input
                                            
                                                id="Part"
                                                name="Part"
                                                placeholder={item.Part}
                                                type="number"
                                                disabled={item.disabled}
                                                onChange={(e) => setPart(e.target.value)}
                                                />
                                        </td>
                                        <td className="">
                                            <Input
                                                id="labor"
                                                name="labor"
                                                placeholder={item.Labor}
                                                type="number"
                                                disabled={item.disabled}
                                                onChange={(e) => setLabor(e.target.value)}
                                                />
                                        </td>
                                        <td className="">
                                            <Input
                                            id="quantity"
                                            name="quantity"
                                            placeholder={item.Quantity}
                                            type="number"
                                            disabled={item.disabled}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            />
            
                                        </td>
                                        <td className="">
                                            <Input
                                                id="Total"
                                                name="Total"
                                                value={item.Total}
                                                disabled={true}
            
                                                />
                                        </td>
                                        <td className="">
                                            {item.disabled ?
                                            <Button onClick={(e) => {
                                                e.preventDefault(); handleEdit(i)
                                            }}>Edit</Button>
                                            :
            
                                            <button onClick={(e)=> {e.preventDefault(); handleSubmit(i)}} >Submit</button>
                                        }
            
                                        </td>
                                    </tr>
                       
            
            )
                            })
                        }
                        <tr className="">
                            <td className="">
                                <button onClick={(e) => { e.preventDefault(); addRow() }}>+</button>
                            </td>
                        </tr>
                    </tbody>
            
            
            </Table>
                        </Form>
        </div>


    )
}