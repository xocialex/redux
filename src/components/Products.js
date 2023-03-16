//import { server, serverapi } from "../../config/index";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "./../redux/action/product";
import { useParams, useSearchParams } from "react-router-dom";

import { addToCart } from "./../redux/action/cart";

const MainProducts = ({
    products,
    productFilters,
    fetchProduct,
    searchTerm,
    product,
    addToCart,
}) => {
    let showLimit = 100,
        showPagination = 2;
    //let [fetchProduct, setfetchProduct] = useState([]);
    let [loading, setLoading] = useState(true);
    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
    let [pages, setPages] = useState(Math.ceil(products.items.length / limit));
    let [currentPage, setCurrentPage] = useState(1);

    const maduro = [
  {
    "id": 2344,
    "name": "Iphone XS (1Sim +eSIM) 512GB",
    "slug": "iphone-xs-1sim-esim-512gb",
    "permalink": "http://localhost/store/product/iphone-xs-1sim-esim-512gb/",
    "date_created": "2023-01-21T09:02:17",
    "date_created_gmt": "2023-01-21T09:02:17",
    "date_modified": "2023-03-03T07:55:41",
    "date_modified_gmt": "2023-03-03T07:55:41",
    "type": "simple",
    "status": "publish",
    "featured": true,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "<p>Iphone XS (1Sim +eSIM) 512GB</p>\n",
    "sku": "P100113",
    "price": "400",
    "regular_price": "400",
    "sale_price": "",
    "date_on_sale_from": null,
    "date_on_sale_from_gmt": null,
    "date_on_sale_to": null,
    "date_on_sale_to_gmt": null,
    "on_sale": false,
    "purchasable": true,
    "total_sales": 0,
    "virtual": false,
    "downloadable": false,
    "downloads": [],
    "download_limit": 0,
    "download_expiry": 0,
    "external_url": "",
    "button_text": "",
    "tax_status": "taxable",
    "tax_class": "",
    "manage_stock": false,
    "stock_quantity": null,
    "backorders": "no",
    "backorders_allowed": false,
    "backordered": false,
    "low_stock_amount": null,
    "sold_individually": false,
    "weight": "",
    "dimensions": {
      "length": "",
      "width": "",
      "height": ""
    },
    "shipping_required": true,
    "shipping_taxable": true,
    "shipping_class": "",
    "shipping_class_id": 0,
    "reviews_allowed": false,
    "average_rating": "0.00",
    "rating_count": 0,
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 0,
    "purchase_note": "",
    "categories": [
      {
        "id": 74,
        "name": "Apple",
        "slug": "apple"
      },
      {
        "id": 261,
        "name": "XS (1Sim +eSIM) 512GB",
        "slug": "xs-1sim-esim-512gb"
      }
    ],
    "tags": [
      {
        "id": 171,
        "name": "Apple",
        "slug": "apple"
      }
    ],
    "images": [
      {
        "id": 2348,
        "date_created": "2023-01-21T09:02:17",
        "date_created_gmt": "2023-01-21T09:02:17",
        "date_modified": "2023-01-21T09:02:17",
        "date_modified_gmt": "2023-01-21T09:02:17",
        "src": "http://localhost/store/wp-content/uploads/2023/01/113.webp",
        "name": "113.webp",
        "alt": ""
      }
    ],
    "attributes": [],
    "default_attributes": [],
    "variations": [],
    "grouped_products": [],
    "menu_order": 0,
    "price_html": "<span class=\"woocommerce-Price-amount amount\"><bdi>400,00&nbsp;<span class=\"woocommerce-Price-currencySymbol\">&euro;</span></bdi></span>",
    "related_ids": [
      2175,
      2174,
      2186,
      2188,
      2166
    ],
    "meta_data": [
      {
        "id": 9561,
        "key": "chosen_product_cat",
        "value": [
          261
        ]
      },
      {
        "id": 27751,
        "key": "rs_page_bg_color",
        "value": ""
      }
    ],
    "stock_status": "instock",
    "has_options": false,
    "etheme_brands": [],
    "store": {
      "id": 1,
      "name": "Admin store WP",
      "shop_name": "",
      "url": "http://localhost/store/store/admin-store-wp/",
      "address": []
    },
    "_links": {
      "self": [
        {
          "href": "http://localhost/store/wp-json/wc/v3/products/2344"
        }
      ],
      "collection": [
        {
          "href": "http://localhost/store/wp-json/wc/v3/products"
        }
      ]
    }
  }
]

    useEffect(() => {
        setLoading(true);

        fetchProduct(
            searchTerm,
            `http://localhost/store/wp-json/wc/v3/products?per_page=10`,
            productFilters
        )
            .then((fetchProduct) => {
                console.log("cargando");
                //console.log('cargando')
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
                console.log("ya");
            });
    }, [productFilters, limit, pages, products.items.length]);

    const cratePagination = () => {
        // set pagination
        let arr = new Array(Math.ceil(products.items.length / limit))
            .fill()
            .map((_, idx) => idx + 1);

        setPagination(arr);
        setPages(Math.ceil(products.items.length / limit));
    };

    const startIndex = currentPage * limit - limit;
    const endIndex = startIndex + limit;
    const getPaginatedProducts = products.items.slice(startIndex, endIndex);

    let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
    let end = start + showPagination;
    const getPaginationGroup = pagination.slice(start, end);

    const next = () => {
        setCurrentPage((page) => page + 1);
    };

    const prev = () => {
        setCurrentPage((page) => page - 1);
    };

    const handleActive = (item) => {
        setCurrentPage(item);
    };

    const selectChange = (e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
        setPages(Math.ceil(products.items.length / Number(e.target.value)));
    };

    const handleCart = (product) => {
        addToCart(product);
        console.log("Product added to Cart !");
    };


    if (loading) {
        return (
            <div>
                <h2>Cargando</h2>
            </div>
        );
    } else {
        return (
            <>
                <div className="row product-grid">
                    {getPaginatedProducts.length === 0 && (
                        <h3>No Products Found </h3>
                    )}

                    {maduro.map((item, i) => (
                        <div
                            className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                            key={i}
                        >
                            {item.name}
                            {item.price}

                       

                            <img
                                style={{
                                    width: "50px",
                                    display: "block",
                                    margin: "auto",
                                }}
                                src={item.images[0].src}
                            />

                             <div className="add-cart">
                            <a style={{
                                    width: "fit-content",
                                    display: "block",
                                    margin: "1rem auto",
                                    backgroundColor: "#3ed2ff",
                                    color: "#fff",
                                    padding: '0.5rem 0.9rem',
                                    cursor: 'pointer',
                                }}
                                className="add"
                                onClick={(e) => handleCart(product)}
                            >
                                <i className="fi-rs-shopping-cart mr-5"></i> Add
                            </a>
                        </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }
};

const mapStateToProps = (state) => ({
    products: state.products,
    productFilters: state.productFilters,
});




const mapDispatchToProps = {
    addToCart,
    fetchProduct,

};

export default connect(mapStateToProps, mapDispatchToProps)(MainProducts);