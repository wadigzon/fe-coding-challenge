import TableRow from "./TableRow";

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
                     <TableRow key={key} id={val.id}
                     firstName={val.first_name} lastName={val.last_name}
                     email={val.email} /> );
               })}
            </tbody>
            <tfoot>
            </tfoot>
         </table>
      </div>
      </>
   );
}