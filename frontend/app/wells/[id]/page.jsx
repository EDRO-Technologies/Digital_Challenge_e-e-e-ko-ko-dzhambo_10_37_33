"use client";

import { useParams } from "next/navigation";
import useSupabaseBrowser from "@/utils/supabase/client";
import Image from "next/image";
import ExpensesGraph from "@/components/expenses-graph";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function Page() {
    const params = useParams();
    const supabase = useSupabaseBrowser();
    const [well, setWell] = useState(null);
    const [graphsData, setGraphsData] = useState({
        expenses: [],
        debit: [],
        eeConsume: [],
    });

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("wells")
                .select("*, wellDayHistory:well_day_histories(*)")
                .eq("well_id", params.id)
                .single();

            if (error) throw new Error(error);

            setWell(data);
        })();
    }, []);

    const layout = (
        <main>
            <h1 className="text-5xl ml-[82px] font-semibold">Куст 2, Сургут</h1>

            <div className="flex flex-row justify-between flex-grow mt-12">
                {/* sidebar */}
                <div className="flex flex-col justify-between">
                    <div className="bg-white px-2 py-4 rounded-full space-y-3">
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full">
                            <Image
                                src="/darhboard_alt.svg"
                                width="20"
                                height="20"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full">
                            <Image
                                src="/darhboard_alt.svg"
                                width="20"
                                height="20"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full">
                            <Image
                                src="/darhboard_alt.svg"
                                width="20"
                                height="20"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full">
                            <Image
                                src="/darhboard_alt.svg"
                                width="20"
                                height="20"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full">
                            <Image
                                src="/darhboard_alt.svg"
                                width="20"
                                height="20"
                                alt="dh"
                            />
                        </div>
                    </div>

                    <div className="bg-white px-2 py-3 rounded-full space-y-3">
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-white rounded-full">
                            <Image
                                src="/Setting_alt_line_light.svg"
                                width="25"
                                height="25"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-white rounded-full">
                            <Image
                                src="/Sign_out_circle_light.svg"
                                width="25"
                                height="25"
                                alt="dh"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-grow justify-between mx-6 space-y-6">
                    <div className="flex flex-row flex-grow space-x-6 max-h-[50%]">
                        {/* Затраты */}
                        <ExpensesGraph
                            data={well?.wellDayHistory.filter(
                                (elem) =>
                                    DateTime.fromISO(
                                        elem.date_fact,
                                    ).toMillis() >
                                    DateTime.now()
                                        .minus({ weeks: 1 })
                                        .toMillis(),
                            )}
                        />

                        {/* дебит скважины */}
                        <div className="bg-white flex-grow rounded-2xl"></div>
                    </div>

                    <div className="flex flex-col flex-grow max-h-[50%]"></div>
                </div>

                <div className="max-w-[282px] bg-white flex-grow rounded-2xl"></div>
            </div>
        </main>
    );

    return (
        <main>
            <h1 className="text-5xl ml-[82px] font-semibold">Куст 2, Сургут</h1>

            <div className="flex flex-row justify-between flex-grow mt-12">
                {/* sidebar */}
                <div className="flex flex-col justify-between">
                    <div className="bg-white px-2 py-4 rounded-full space-y-3">
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full">
                            <Image
                                src="/darhboard_alt.svg"
                                width="20"
                                height="20"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full">
                            <Image
                                src="/darhboard_alt.svg"
                                width="20"
                                height="20"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full">
                            <Image
                                src="/darhboard_alt.svg"
                                width="20"
                                height="20"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full">
                            <Image
                                src="/darhboard_alt.svg"
                                width="20"
                                height="20"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full">
                            <Image
                                src="/darhboard_alt.svg"
                                width="20"
                                height="20"
                                alt="dh"
                            />
                        </div>
                    </div>

                    <div className="bg-white px-2 py-3 rounded-full space-y-3">
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-white rounded-full">
                            <Image
                                src="/Setting_alt_line_light.svg"
                                width="25"
                                height="25"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-white rounded-full">
                            <Image
                                src="/Sign_out_circle_light.svg"
                                width="25"
                                height="25"
                                alt="dh"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-grow justify-between mx-6 space-y-6">
                    <div className="flex flex-row flex-grow space-x-6 max-h-[50%]">
                        {/* Затраты */}
                        <ExpensesGraph
                            data={well?.wellDayHistory.filter(
                                (elem) =>
                                    (DateTime.fromISO(
                                        elem.date_fact,
                                    ).toMillis() >
                                        DateTime.now()
                                            .minus({ week: 1 })
                                            .toMillis()) &
                                    (DateTime.fromISO(
                                        elem.date_fact,
                                    ).toMillis() <
                                        DateTime.now().toMillis()),
                            )}
                            mode="week"
                        />

                        {/* дебит скважины */}
                        <div className="bg-white flex-grow rounded-2xl"></div>
                    </div>

                    <div className="flex flex-col flex-grow max-h-[50%]"></div>
                </div>

                <div className="max-w-[282px] bg-white flex-grow rounded-2xl"></div>
            </div>
        </main>
    );
}
