import { FormEvent } from "react"



export default () => {

  
    const handleClick = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target)

    }

    return (
        <div className="px-5">

        <table className="border border-color-dark table table-striped table-bordered text-center table-hover">
            <thead>
                <tr  >
                    <td>Invoice #</td>
                    <td>Owner</td>
                    <td>Year</td>
                    <td>Make</td>
                    <td>Model</td>
                    <td>Vin</td>
                </tr>
            </thead>
            <tbody>
                    <tr onClick={handleClick}  data-href="">
                        <td>1234</td>
                    <td>Bob Ross</td>
                    <td>1992</td>
                    <td>Honda</td>
                    <td>Accord</td>
                    <td>J1jfs25ah25vcn12o2fm15</td>
                
                    </tr>
                <tr onClick={handleClick}  data-href="">
                <td>1234</td>
                        <td>Bob Ross</td>
                    <td>1992</td>
                    <td>Honda</td>
                    <td>Accord</td>
                    <td>J1jfs25ah25vcn12o2fm15</td>
                </tr>
                <tr onClick={handleClick}  data-href="">
                <td>1234</td>
                    <td>Bob Ross</td>
                    <td>1992</td>
                    <td>Honda</td>
                    <td>Accord</td>
                    <td>J1jfs25ah25vcn12o2fm15</td>
                </tr>
                <tr onClick={handleClick}  data-href="">
                <td>1234</td>
                    <td>Bob Ross</td>
                    <td>1992</td>
                    <td>Honda</td>
                    <td>Accord</td>
                    <td>J1jfs25ah25vcn12o2fm15</td>
                </tr>
                <tr onClick={handleClick}  data-href="">
                <td>1234</td>
                    <td>Bob Ross</td>
                    <td>1992</td>
                    <td>Honda</td>
                    <td>Accord</td>
                    <td>J1jfs25ah25vcn12o2fm15</td>
                </tr>
                <tr onClick={handleClick}  data-href="">
                <td>1234</td>
                    <td>Bob Ross</td>
                    <td>1992</td>
                    <td>Honda</td>
                    <td>Accord</td>
                    <td>J1jfs25ah25vcn12o2fm15</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}