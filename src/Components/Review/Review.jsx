import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Review = () => {
    const axiosPublic = useAxiosPublic()
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        axiosPublic.get('/reviews')
            .then(res => {
                setReviews(res.data)
            })
    }, [axiosPublic])
    // console.log(reviews);
    return (
        <div className="">
            <div className="">
                <h1 className="text-3xl font-bold ">Task Manager Stories</h1>
                <p className="text-xl font-sans font-semibold"> Explore the Experiences of Users with Our Task Manager</p>
            </div>
            <div className="grid grid-cols-3 my-10 gap-5">
                {
                    reviews.map(review =>
                        <div key={review._id} className="block ">
                            <img
                                alt="Art"
                                src={review.img}
                                className="h-64 w-full hover:scale-100 hover:rounded-md  hover:border-2 hover:border-[#52ab98] scale-90 duration-500 object-cover sm:h-80 lg:h-96"
                            />

                            <h3 className="mt-4 text-xl font-bold text-gray-900 sm:text-xl">{review.name}</h3>
                            <h3 className="mt-2  text-sm  text-gray-900 ">{review.profession}</h3>

                            <p className="mt-2 max-w-sm text-gray-700">
                                {review.review}
                            </p>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default Review;