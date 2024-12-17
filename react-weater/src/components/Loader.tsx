import { Spinner } from "react-bootstrap"

export const Loader = () => {
    return (
        <div style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Spinner animation="border" variant="primary" />
        </div>
    )
}