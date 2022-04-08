import LastLoginCells from "./LastLoginCells";

export default function UsersTable(props : any) {
   const { usersList } = props;

   return (
      <>
      <h3>Number of users: {usersList.length}</h3>
      <div>
         <table>
            <thead>
               <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Last Login Time</th>
                  <th>Last Login IP Address</th>
               </tr>
            </thead>
            <tbody>
               {usersList.map((val:any, key:any) => {
                  return (
                     <tr key={key}>
                        <td>{val.id}</td>
                        <td>{val.first_name}</td>
                        <td>{val.last_name}</td>
                        <td>{val.email}</td>
                        <LastLoginCells userId = {val.id} />
                     </tr>
                  )
               })}
            </tbody>
            <tfoot>
            </tfoot>
         </table>
      </div>
      </>
   );
}