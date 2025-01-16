import React, { Fragment } from "react"

import Button, { IconButton } from "@atlaskit/button/new"
import CrossIcon from "@atlaskit/icon/glyph/cross"
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from "@atlaskit/modal-dialog"
import { Flex, Grid } from "@atlaskit/primitives"
import {
  gridStyles,
  closeContainerStyles,
  titleContainerStyles
} from "../../styles"

import Form, { ErrorMessage, Field, HelperMessage } from "@atlaskit/form"
import TextField from "@atlaskit/textfield"

import Avatar from "@atlaskit/avatar"
import { User } from "../../../src/types/user"
import { useTranslation } from "react-i18next"

interface UserModalProps {
  user: User
  onClose: () => void
}

type UserFormType = {
  name: string
  email: string
}

export default ({ user: { id, name, email }, onClose }: UserModalProps) => {
  const { t } = useTranslation("user")
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <Grid gap="space.200" templateAreas={["title close"]} xcss={gridStyles}>
          <Flex xcss={closeContainerStyles} justifyContent="end">
            <IconButton
              appearance="subtle"
              icon={CrossIcon}
              label="Close Modal"
              onClick={onClose}
            />
          </Flex>
          <Flex xcss={titleContainerStyles} justifyContent="start">
            <ModalTitle>
              <Flex alignItems="center" gap="space.100">
                <Avatar />
                {name}
              </Flex>
            </ModalTitle>
          </Flex>
        </Grid>
      </ModalHeader>
      <ModalBody>
        <Form<UserFormType> onSubmit={(data) => console.log(data)}>
          {({ formProps, submitting }) => (
            <form {...formProps}>
              <Field
                name="name"
                label={t("name")}
                defaultValue={name}
                isRequired
              >
                {({ fieldProps, error }) => (
                  <Fragment>
                    <TextField autoComplete="off" {...fieldProps} />
                    {!error && (
                      <HelperMessage>{t("name.help-text")}</HelperMessage>
                    )}
                  </Fragment>
                )}
              </Field>
              <Field
                name="email"
                label={t("email")}
                defaultValue={email}
                isRequired
              >
                {({ fieldProps, error }) => (
                  <Fragment>
                    <TextField {...fieldProps} />
                    {!error && (
                      <HelperMessage>{t("email.help-text")}</HelperMessage>
                    )}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </Fragment>
                )}
              </Field>
            </form>
          )}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button appearance="primary" onClick={onClose}>
          {t("update")}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
