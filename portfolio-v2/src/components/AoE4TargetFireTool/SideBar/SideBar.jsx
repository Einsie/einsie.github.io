/* SideBar is a component to display either combat log history
    or unit presets for project */

// Import necessary libraries to component
import { useState } from "react";
import SelectOptionInput from "../../BasicCustomComponents/SelectOptionInput";
import SearchBar from "../../BasicCustomComponents/SearchBar";
import SideBarList from "./SideBarList";

// Declare SideBar as the default function returned from file
//    destructure the prop for necessary parameters
export default function SideBar({
  children,
  position,
  array,
  onUse,
  onRemove,
  dispatch,
}) {
  // Declare local  instance state variables for the component
  //    to control the input and select elements
  const [sortBySelect, setSortBySelect] = useState("oldest");
  const [sortBySearch, setSortBySearch] = useState(array);

  let sortedList = [];
  let searchList = [];

  /* The following if else is for sorting the parent array
        list into sortedList, based on sort state variables
      First confirm that the parent list is not empty and confirm if
        it is a preset or combat log */

  // The parent array has to be sliced first to create
  //    a copy of it, as to not edit the original array with sort()

  if (array.length > 0) {
    sortBySelect === "oldest"
      ? (sortedList = sortBySearch)
      : sortBySelect === "recent"
      ? (sortedList = sortBySearch
          .slice()
          .sort((a, b) => Number(b.id) - Number(a.id)))
      : (sortedList = sortBySearch
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name)));

    // Creating a list of available items SearchBar component can
    //    compare its input against
    array[0].isPreset
      ? array.map((arrayItem) => searchList.push([arrayItem.name]))
      : array.map((arrayItem) =>
          searchList.push([arrayItem.name, arrayItem.loser])
        );
  }

  // Return jsx to parent component, location and some content taken
  //    as parameters
  return (
    <div className={`sidebar ${position}`}>
      {children}
      <SearchBar
        defaultArray={array}
        searchArrayDataList={searchList}
        onSetSortedList={setSortBySearch}
      />
      {/* The following is the drop down select for sorting as controlled element */}
      <SelectOptionInput
        value={sortBySelect}
        onChange={(event) => setSortBySelect(event.target.value)}
        options={["oldest", "recent", "name"]}
        extraContent={"Sort by "}
      />
      {sortBySearch.length > 0 ? (
        <SideBarList
          sortedList={sortedList}
          dispatch={dispatch}
          onUse={onUse}
          onRemove={onRemove}
        />
      ) : (
        <p>No results available</p>
      )}
    </div>
  );
}
