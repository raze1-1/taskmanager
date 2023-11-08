import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="flex-row">
            <div className="flex justify-center">
                <h1 className="mt-3 text-center text-3xl font-extrabold text-white">2Do</h1>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-white mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-gray-400 hover:text-cyan-200">
                {linkName}
            </Link>
            </p>
        </div>
    )
}