import { useEffect, useState } from "react";
import { getRandomUsers } from "../api/user";

const UserCard = () => {
  const [randomUser, setRandomUser] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getRandomUsers().then((info) => {
      setRandomUser(info);
      setLoading(false);
      setInterval(() => {
        info.unshift(info.pop());
        setRandomUser([...info]);
      }, 1000);
    });
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div className="p-3 flex">
          {randomUser.length > 0 &&
            randomUser.map((item) => (
              <div key={item.cell} className="p-3 bg-white shadow-md">
                <img
                  src={item.picture.medium}
                  alt="UserPhoto"
                  className="object-cover rounded-lg"
                />
                <h3 className="p-2 mt-1 text-base font-medium">{`${item.name.title} ${item.name.first} ${item.name.last}`}</h3>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default UserCard;
