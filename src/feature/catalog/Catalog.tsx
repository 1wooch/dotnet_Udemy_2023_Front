import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { productSelectors, fetchProductsAsync, fetchFilters, setProductParams, setPageNumber} from "./catalogSlice";
import {  Checkbox, FormControl, FormControlLabel,  Grid,  Paper, RadioGroup } from "@mui/material";
import ProductSearch from "./productSearch";
import RadioButtonGroup from "../../app/components/RadiobuttonGroup";
import CheckBoxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";

//97 not working need to double check

  const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'priceAsc', label: 'Price - Low to high' },
  ]
  export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status, filtersLoaded, brands, types, productparams, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
      if (!filtersLoaded) dispatch(fetchFilters());
    },[filtersLoaded,dispatch])

    if (!filtersLoaded) return <LoadingComponent message='Loading products...' />

    return (
        <Grid container columnSpacing={4}>
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
                <CheckBoxButtons 
                  items={brands}
                  checked={productparams.brands}
                  onChange={(brands:string[]) => dispatch(setProductParams({ brands }))}
                />
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
            <Grid item xs={9} sx={{mb:2}}>
              {metaData && 
              <AppPagination
                metaData={metaData}
                onPageChange={(page:number) => dispatch(setPageNumber({pageNumber: page}))}
              />}
            </Grid>

        </Grid>
    )
  }