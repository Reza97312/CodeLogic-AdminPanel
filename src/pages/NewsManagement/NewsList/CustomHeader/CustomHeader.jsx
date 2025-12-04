import { useCallback } from "react";
import {Row, Col, Input, Button, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Share, Printer, FileText, File, Grid, Copy} from "react-feather";
import debounce from "debounce";



const CustomHeader = ({store,toggleSidebar,handlePerPage,rowsPerPage,handleFilter,searchTerm, handleSearch}) => {
  

    const debouncedSearch = useCallback(
      debounce((value) => {
      handleSearch(value);
      }, 2000),
      []
    );
    const onChange = (value) => {
      debouncedSearch(value);
    };
    const onSearchEnter = (value) => {
      if(e.key === 'Enter'){
        debouncedSearch(value)
      }
    }


  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(store.data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }


  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label style={{ fontSize: "17px" }} htmlFor="rows-per-page">
              تعداد نمایش :
            </label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center me-1">
            <label
              style={{ fontSize: "17px" }}
              className="mb-0 text-nowrap"
              htmlFor="search-invoice"
            >
              جستجو :
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => {handleFilter(e.target.value); onChange(e.target.value); onSearchEnter(e.target.value)}}
              placeholder="نام خبر..."
            />
          </div>
          <div className="d-flex align-items-center table-header-actions">
            <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">وضعیت</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="w-100">
                  <Printer className="font-small-4 me-50" />
                  <span className="align-middle">فعال</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Grid className="font-small-4 me-50" />
                  <span className="align-middle">غیرفعال</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            {/* <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              اضافه کردن خبر
            </Button> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustomHeader