import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { productSelectors, fetchProductsAsync, fetchFilters, setProductParams} from "./catalogSlice";
import { Box, Checkbox, FormControl, FormControlLabel,  Grid, Pagination, Paper, RadioGroup, Typography } from "@mui/material";
import ProductSearch from "./productSearch";
import RadioButtonGroup from "../../app/components/RadiobuttonGroup";

//97 not working need to double check

  const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'priceAsc', label: 'Price - Low to high' },
  ]
  export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status, filtersLoaded, brands, types, productparams} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
      if (!filtersLoaded) dispatch(fetchFilters());
    },[filtersLoaded,dispatch])

    if (status.includes('pending')) return <LoadingComponent message='Loading products...' />

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
              <Paper sx={{mb:2}}>
                <ProductSearch/>
              </Paper>
              <Paper sx={{mb:2, p:2}}>
                <RadioButtonGroup 
                  selectedValue={productparams.orderBy}
                  options={sortOptions}
                  onChange={(event) => dispatch(setProductParams({ orderBy: event.target.value }))}
                />
              </Paper>
              <Paper sx={{mb:2, p:2}}>
                <FormControl component="fieldset">
                    <RadioGroup>
                        {brands.map(brand => (
                            <FormControlLabel key={brand} value={brand} control={<Checkbox />} label={brand}/>
                        ))}
                    </RadioGroup>
                </FormControl>
              </Paper>
              <Paper sx={{mb:2, p:2}}>
                <FormControl component="fieldset">
                    <RadioGroup>
                        {types.map(type => (
                            <FormControlLabel key={type} value={type} control={<Checkbox />} label={type}/>
                        ))}
                    </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <ProductList products={products} />
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={9}>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography>
                      Displaying 1-6 of 20 items
                    </Typography>
                    <Pagination 
                      color= 'secondary'
                      size="large"
                      count={10}
                      page={2}
                    >

                    </Pagination>
              </Box>
            </Grid>

        </Grid>
    )
  }