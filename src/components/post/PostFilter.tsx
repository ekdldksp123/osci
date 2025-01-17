import React, { Dispatch, SetStateAction } from "react"

import { Flex, Grid } from "@atlaskit/primitives"
import { DatePicker } from "@atlaskit/datetime-picker"
import { IconButton } from "@atlaskit/button/new"
import FilterIcon from "@atlaskit/icon/core/filter"
import { useTranslation } from "react-i18next"

interface PostFilterProps {
  setStartDate: Dispatch<SetStateAction<string>>
  setEndDate: Dispatch<SetStateAction<string>>
}

export default ({ setStartDate, setEndDate }: PostFilterProps) => {
  const { t } = useTranslation("post")

  return (
    <Grid templateColumns="1fr 1fr 0.1fr" gap="space.100" alignItems="center">
      <Flex direction="column">
        <DatePicker
          dateFormat="YYYY-MM-DD"
          placeholder={t("startDate") || ""}
          id="post-startDate"
          clearControlLabel="Clear date"
          shouldShowCalendarButton
          openCalendarLabel="open calendar"
          onChange={(e) => setStartDate(e)}
        />
      </Flex>
      <Flex direction="column">
        <DatePicker
          dateFormat="YYYY-MM-DD"
          placeholder={t("endDate") || ""}
          id="post-endDate"
          clearControlLabel="Clear date"
          shouldShowCalendarButton
          openCalendarLabel="open calendar"
          onChange={(e) => setEndDate(e)}
        />
      </Flex>
      <Flex justifyContent="center">
        <IconButton icon={FilterIcon} label="Filter" type="submit" />
      </Flex>
    </Grid>
  )
}
