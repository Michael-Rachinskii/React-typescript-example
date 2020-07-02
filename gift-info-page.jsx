import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import OuterLink from '@material-ui/core/Link';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from '../../../components/Layout';
import { fetchOrderInfoStart } from '../../../store/actions/ordersActions';

function GiftInfoPage({ id }) {
  const dispatch = useDispatch();
  const {
    id: orderId,
    date,
    paymentStatus,
    fulfillmentStatus,
    shippingAddress = {},
    billingAddress = {},
    invoiceLink,
  } = useSelector((state) => state.orders.order);
  const isFetching = useSelector((state) => state.orders.isFetching);

  useEffect(() => {
    dispatch(fetchOrderInfoStart(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <Box mb={3}>
        <Button onClick={() => Router.back()}>
          <ArrowBackIcon />
          Back
        </Button>
        <Typography paragraph variant="h3">{`Order #${id}`}</Typography>
      </Box>
      {isFetching && (
        <Box display="flex" width="100%" alignItems="center" mt={3}>
          <CircularProgress size={50} />
        </Box>
      )}
      {!isFetching && orderId && (
        <Box display="flex" flexDirection="column">
          <Box p={3}>
            <Typography paragraph variant="h6">
              Date
            </Typography>
            <Typography paragraph variant="body1">
              {date}
            </Typography>
          </Box>
          <Divider />
          <Box p={3}>
            <Typography paragraph variant="h6">
              Payment Status
            </Typography>
            <Chip
              variant="default"
              disabled={paymentStatus === 'Unpaid'}
              label={paymentStatus}
            />
          </Box>
          <Divider />
          <Box p={3}>
            <Typography paragraph variant="h6">
              Fulfillment Status
            </Typography>
            <Chip
              variant="default"
              disabled={fulfillmentStatus === 'Unfulfilled'}
              label={fulfillmentStatus}
            />
          </Box>
          <Divider />
          <Box p={3}>
            <Typography paragraph variant="h6">
              Shipping Details
            </Typography>
            <Typography
              paragraph
              variant="body1"
            >{`${shippingAddress.firstName} ${shippingAddress.lastName}`}</Typography>
            <Typography paragraph variant="body1">
              {shippingAddress.line}
            </Typography>
            <Typography paragraph variant="body1">
              {shippingAddress.province && `${shippingAddress.province.name},`}
              {shippingAddress.country && shippingAddress.country.name}
            </Typography>
            <Typography
              paragraph
              variant="body1"
            >{`${shippingAddress.postalCode} ${shippingAddress.city}`}</Typography>
            {shippingAddress.phoneNumber && (
              <Typography paragraph variant="body1">
                {shippingAddress.phoneNumber}
              </Typography>
            )}
            <Typography paragraph variant="body1">
              {shippingAddress.email}
            </Typography>
            {shippingAddress.vatNumber && (
              <Typography paragraph variant="body1">
                {shippingAddress.vatNumber}
              </Typography>
            )}
          </Box>
          <Divider />
          <Box p={3}>
            <Typography paragraph variant="h6">
              Billing Details
            </Typography>
            <Typography
              paragraph
              variant="body1"
            >{`${billingAddress.firstName} ${billingAddress.lastName}`}</Typography>
            <Typography paragraph variant="body1">
              {billingAddress.line}
            </Typography>
            <Typography paragraph variant="body1">
              {billingAddress.province && `${billingAddress.province.name},`}
              {billingAddress.country && billingAddress.country.name}
            </Typography>
            <Typography
              paragraph
              variant="body1"
            >{`${billingAddress.postalCode} ${billingAddress.city}`}</Typography>
            {billingAddress.phoneNumber && (
              <Typography paragraph variant="body1">
                {billingAddress.phoneNumber}
              </Typography>
            )}
            <Typography paragraph variant="body1">
              {billingAddress.email}
            </Typography>
            {billingAddress.vatNumber && (
              <Typography paragraph variant="body1">
                {billingAddress.vatNumber}
              </Typography>
            )}
          </Box>
          <Divider />
          <Box p={3}>
            <Typography paragraph variant="h6">
              Payment Details
            </Typography>
            <Typography paragraph variant="body1">
              Offline
            </Typography>
          </Box>
          <Divider />
          <Box p={3}>
            <Typography paragraph variant="h6">
              Invoice
            </Typography>
            <Button variant="outlined" disabled={!invoiceLink}>
              <OuterLink color="inherit" href={invoiceLink} underline="none">
                Download Invoice
              </OuterLink>
            </Button>
          </Box>
        </Box>
      )}
    </Layout>
  );
}
GiftInfoPage.propTypes = {
  id: PropTypes.string.isRequired,
};

const memoizedGiftInfoPage = memo(GiftInfoPage);

memoizedGiftInfoPage.getInitialProps = (props) => {
  const {
    store,
    query: { id },
  } = props.ctx;
  return { id, store };
};

export default memoizedGiftInfoPage;
