import * as React from 'react';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addNewProductAPI, getAllManufacturerAPI, getAllProductTypeAPI } from '../components/services/index';

export default function ProductDialog(props) {
  const { openDialog, setOpenDialog, getAllProduct, setContentToast, setSeverity, setOpenToast } = props;
  const [name, setName] = React.useState();
  const [image, setImage] = React.useState();
  const [quantity, setQuantity] = React.useState();
  const [price, setPrice] = React.useState();
  const [manufacturer, setManufacturer] = React.useState();
  const [productType, setProductType] = React.useState();
  const [description, setDescription] = React.useState();
  const [isError, setIsError] = React.useState(false);
  const [listManufacturer, setListManufacturer] = React.useState();
  const [listProductType, setListProductType] = React.useState();

  const addNewProduct = async (data) => {
    try {
      const res = await addNewProductAPI(data);
      if (res.status === 200) {
        setName(null);
        setImage(null);
        setQuantity(null);
        setPrice(null);
        setManufacturer(null);
        setProductType(null);
        setDescription(null);
        setContentToast(res?.data);
        setSeverity('success');
        setOpenToast(true);
        setOpenDialog(false);
        getAllProduct();
      } else {
        console.log(res);
        setContentToast('Thêm product thất bại');
        setOpenToast(true);
        setSeverity('error');
      }
    } catch (error) {
      console.log(error);
      setContentToast('Thêm product thất bại');
      setOpenToast(true);
      setSeverity('error');
    }
  };

  const getAllManufacturer = async () => {
    try {
      const res = await getAllManufacturerAPI();
      setListManufacturer(res?.data);
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProductType = async () => {
    try {
      const res = await getAllProductTypeAPI();
      setListProductType(res?.data);
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllManufacturer();
    getAllProductType();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
    setName(null);
    setImage(null);
    setQuantity(null);
    setPrice(null);
    setManufacturer(null);
    setProductType(null);
    setDescription(null);
  };

  const handleAddProduct = () => {
    if (!quantity || !image || !name || !price || !manufacturer || !productType) {
      setIsError(true);
    } else {
      setIsError(false);
      const data = {
        name,
        image,
        quantity,
        price,
        manufacturerId: manufacturer,
        productTypeId: productType,
        description: [
          {
            type: 'Content',
            description,
          },
        ],
      };

      console.log(data);

      // CALL API add new product
      addNewProduct(data);
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent sx={{ height: 650 }}>
          <TextField
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="image"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <TextField
              autoFocus
              id="quantity"
              label="Quantity"
              type="number"
              size="medium"
              sx={{ width: 500, mr: 2 }}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <TextField
              id="price"
              label="Price"
              type="Number"
              fullWidth
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <Autocomplete
              disablePortal
              id="manufacturer"
              options={listManufacturer}
              getOptionLabel={(option) => option?.manufacturerName}
              sx={{ width: 500, mr: 2 }}
              onChange={(e, newValue) => {
                console.log(newValue);
                setManufacturer(newValue?._id);
              }}
              renderInput={(params) => <TextField {...params} label="Manufacturer" />}
            />
            <Autocomplete
              disablePortal
              id="productType"
              options={listProductType}
              getOptionLabel={(option) => option?.productTypeName}
              fullWidth
              onChange={(e, newValue) => {
                console.log(newValue);
                setProductType(newValue?._id);
              }}
              renderInput={(params) => <TextField {...params} label="Product Type" />}
            />
          </Box>
          <TextField
            margin="dense"
            id="description"
            label="Description"
            minRows={10}
            multiline
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <p
            style={{
              margin: '10px',
              color: 'red',
              fontWeight: 'Bold',
              justifyContent: 'flex-end',
              display: isError ? 'flex' : 'none',
            }}
          >
            Please enter full information
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddProduct} type="submit">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}