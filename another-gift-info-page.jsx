import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from '../../../../components/Layout';
import { fetchGiftInfoStart } from '../../../../store/actions/giftsActions';

function GiftInfoPage({ id }) {
  const { isFetching, gift } = useSelector((state) => state.gifts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGiftInfoStart(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <Box mb={3}>
        <Button onClick={() => Router.back()}>
          <ArrowBackIcon />
          Back
        </Button>
        <Typography variant="h3">{`Gift #${id}`}</Typography>
      </Box>
      {isFetching && (
        <Box display="flex" width="100%" alignItems="center" mt={3}>
          <CircularProgress size={50} />
        </Box>
      )}
      {!isFetching && gift && (
        <Box display="flex" flexDirection="column">
          <Box p={3}>
            <Typography variant="h6">Delivery date</Typography>
            <Typography variant="body1">{gift.deliveryDate || '-'}</Typography>
          </Box>
          <Divider />
          <Box p={3}>
            <Typography variant="h6">Delivery Message</Typography>
            <Typography variant="body1">{gift.message || '-'}</Typography>
          </Box>
          <Divider />
          <Box p={3}>
            <Typography paragraph variant="h6">
              Shipping Details
            </Typography>
            <Typography
              paragraph
              variant="body1"
            >{`${gift.shippingAddress.firstName} ${gift.shippingAddress.lastName}`}</Typography>
            <Typography paragraph variant="body1">
              {gift.shippingAddress.line}
            </Typography>
            <Typography paragraph variant="body1">
              {gift.shippingAddress.province &&
                `${gift.shippingAddress.province.name},`}
              {gift.shippingAddress.country &&
                gift.shippingAddress.country.name}
            </Typography>
            <Typography
              paragraph
              variant="body1"
            >{`${gift.shippingAddress.postalCode} ${gift.shippingAddress.city}`}</Typography>
            {gift.shippingAddress.phoneNumber && (
              <Typography paragraph variant="body1">
                {gift.shippingAddress.phoneNumber}
              </Typography>
            )}
            <Typography paragraph variant="body1">
              {gift.shippingAddress.email}
            </Typography>
            {gift.shippingAddress.vatNumber && (
              <Typography paragraph variant="body1">
                {gift.shippingAddress.vatNumber}
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
            >{`${gift.billingAddress.firstName} ${gift.billingAddress.lastName}`}</Typography>
            <Typography paragraph variant="body1">
              {gift.billingAddress.line}
            </Typography>
            <Typography paragraph variant="body1">
              {gift.billingAddress.province &&
                `${gift.billingAddress.province.name},`}
              {gift.billingAddress.country && gift.billingAddress.country.name}
            </Typography>
            <Typography
              paragraph
              variant="body1"
            >{`${gift.billingAddress.postalCode} ${gift.billingAddress.city}`}</Typography>
            {gift.billingAddress.phoneNumber && (
              <Typography paragraph variant="body1">
                {gift.billingAddress.phoneNumber}
              </Typography>
            )}
            <Typography paragraph variant="body1">
              {gift.billingAddress.email}
            </Typography>
            {gift.billingAddress.vatNumber && (
              <Typography paragraph variant="body1">
                {gift.billingAddress.vatNumber}
              </Typography>
            )}
          </Box>
          <Divider />
          <Box p={3}>
            <Typography variant="h6">Payment Details</Typography>
            <Typography variant="body1">Offline</Typography>
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
